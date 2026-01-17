using Microsoft.CodeAnalysis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CodeGenerator.Generator;

public class GeneratorWriter(GeneratorLogic _generator)
{
    public string GetPatternOfNewClasses(ITypeSymbol typeSymbol) => $@"
                    using System.ComponentModel;
                    using CodeGenerator.Data;
                    using UnitOfWorkUpgrade.Realization;
                    using UnitOfWorkUpgrade.Services;
                    namespace {typeSymbol.ContainingNamespace}
                    {{
                      partial class {typeSymbol.Name}
                      {{
                        {GenerateProperties(typeSymbol)}
                      }}
                    }}";
    private string GenerateProperties(ITypeSymbol type)
    {
        var sb = new StringBuilder();
        var suffix = "Service";
        var prefixForValueStorages = "Complete";

        foreach (var memberOfType in type.GetMembers().OfType<IFieldSymbol>()
          .Where(x => x.Name.EndsWith(suffix)))
        {
            var propertyName = memberOfType.Name.Replace(suffix, string.Empty);
            var valueStorage = prefixForValueStorages + propertyName;
            var code =
             $@"
                private {memberOfType.Type.MetadataName}? {valueStorage};
                public {memberOfType.Type.MetadataName} {propertyName}
                {{
                    get 
                    {{
                       if ({valueStorage} is null) {valueStorage} = new {valueStorage}{_generator.GenerateConstructor(type, memberOfType.Name)}
                       return {valueStorage};
                    }}
                  
                }}";
            sb.AppendLine(code);
        }

        return sb.ToString();
    }
}
