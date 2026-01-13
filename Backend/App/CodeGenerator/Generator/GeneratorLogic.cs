using CodeGenerator.Attributes;
using CodeGenerator.Data;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CodeGenerator.Generator
{
    public class GeneratorLogic(IPaimon _canningService, IAttributeDeluxe _attributeservice)
    {
        public string GenerateConstructor(ITypeSymbol type, string nameOfFieldWithAttr)
        {
            IList<IParameterSymbol>? parameters = null;

            var locationParams = GetValueWithAtribute(type, nameOfFieldWithAttr);

            switch (locationParams.nums)
            {
                case null:
                    if(locationParams.strs is null) throw new ArgumentNullException(nameof(locationParams.strs) + "was null. This situation is incorrected");
                    parameters = GetConstructorAndParams(type, locationParams.strs!.ToList()!);
                    break;
                case int[]:
                    parameters = GetConstructorAndParams(type, locationParams.nums.ToList());
                    break;

            }
            return GenerateArgs(parameters);

        }

        public (int[]? nums, string[] strs) GetValueWithAtribute(ITypeSymbol type, string nameOfMethodWithAttribute)
        {
            var field = type.GetMembers()
                .OfType<IFieldSymbol>()
                .Where(x => x.HasAttribute<UseableParamsAttribute>(_attributeservice) & x.Name == nameOfMethodWithAttribute)
                .SingleOrDefault();

            if (field is null) throw new NullReferenceException(nameof(field));

            var attr = field.GetAttributes().ToList().Where(x => _attributeservice.GetName(x) == nameof(UseableParamsAttribute)).SingleOrDefault();

            if (attr is null) throw new Exception("Logic exception.");

            var constant = _attributeservice.GetConstructorArgs(attr).FirstOrDefault();

            _canningService.SetTypedConstant(constant);

            int[]? attrWithInt = new int[0];
            string[] attrWithStr = new string[0];
            try
            {
                attrWithStr = _canningService.GetValues().Select(x => (string)_canningService.GetValueWithTypedConstant(x)).ToArray();
            }
            catch (InvalidCastException)
            {
                attrWithInt = attrWithStr.Length == 0 ? _canningService.GetValues().Select(x => (int)_canningService.GetValueWithTypedConstant(x)).ToArray() : null;
            }
            return (attrWithInt, attrWithStr);


        }

        public string GenerateArgs(IList<IParameterSymbol> parameters)
        {
            StringBuilder sb = new StringBuilder();

            sb.Append("(");

            foreach (var param in parameters)
            {
                sb.Append(param.Name + ",");
            }
            sb.Remove(sb.ToString().LastIndexOf(","), 1);

            sb.Append(");");

            return sb.ToString();

        }

        public IList<IParameterSymbol> GetConstructorAndParams(ITypeSymbol type, List<int> indexesArg)
        {
            var constructor = type.GetMembers().OfType<IMethodSymbol>().Where(x => x.IsConstructor()).SingleOrDefault(); // костыль не адаптивный :(

            if (constructor is null) throw new NullReferenceException("Constructor wasn`t found");

            IList<IParameterSymbol> parameters = new List<IParameterSymbol>();

            foreach (int? i in indexesArg)
            {
                if (i > constructor.Parameters.Length || i is null) throw new IndexOutOfRangeException("Param wasn`t found in nums");

                parameters.Add(constructor.Parameters[(int)i]);
            }

            return parameters;

        }
        public IList<IParameterSymbol> GetConstructorAndParams(ITypeSymbol type, List<string> NamesArg)
        {
            var n = type.GetMembers();

            var constructor = n.OfType<IMethodSymbol>().Where(x => x.IsConstructor()).SingleOrDefault(); // костыль не адаптивный :(

            if (constructor is null) throw new NullReferenceException("Constructor wasn`t found ");

            IList<IParameterSymbol> parameters = new List<IParameterSymbol>();

            foreach (string name in NamesArg)
            {
                var param = constructor.Parameters.Where(x => x.Name == name).SingleOrDefault();

                if (param is null) throw new NullReferenceException("Param wasn`t found in strs");

                parameters.Add(param);
            }

            return parameters;
        }
    }
}
