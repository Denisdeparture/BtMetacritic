using Microsoft.CodeAnalysis;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Text;

namespace CodeGenerator.Data
{
    public interface IPaimon
    {
        public void SetTypedConstant(TypedConstant value);

        public ImmutableArray<TypedConstant> GetValues();

        public object GetValueWithTypedConstant(TypedConstant constant);

    }
}
