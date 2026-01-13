using CodeGenerator.Data;
using Microsoft.CodeAnalysis;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeGenerator.ProxyClasses
{
    public class Paimon : IPaimon
    {
        private TypedConstant MoqConstant { get; set; }
        public void SetTypedConstant(TypedConstant value)
        {
            MoqConstant = value;
        }
        public ImmutableArray<TypedConstant> GetValues()
        {
            return MoqConstant.Values;
        }
        public object GetValueWithTypedConstant(TypedConstant constant)
        {
            return constant.Value ?? throw new NullReferenceException("Params shouldn`t null");
        }
    }
}
