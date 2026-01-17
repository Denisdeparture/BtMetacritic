using CodeGenerator.Data;
using Microsoft.CodeAnalysis;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Text;

namespace CodeGenerator.ProxyClasses
{
    public class AttributeDataDeluxe : IAttributeDeluxe
    {
        public AttributeData? Attribute {  get; set; }
        public string GetName(AttributeData? attribute = null) => attribute is null ? Attribute!.AttributeClass!.Name : attribute.AttributeClass!.Name;

        public ImmutableArray<TypedConstant> GetConstructorArgs(AttributeData? attribute = null) => attribute is null ? Attribute!.ConstructorArguments : attribute.ConstructorArguments;

    }
}
