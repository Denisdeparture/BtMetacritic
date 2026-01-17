using Microsoft.CodeAnalysis;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Text;

namespace CodeGenerator.Data
{
    public interface IAttributeDeluxe
    {
        public AttributeData? Attribute { get; set; }
        public string GetName(AttributeData? attribute = null);
        public ImmutableArray<TypedConstant> GetConstructorArgs(AttributeData? attribute = null);

    }
}
