using Microsoft.CodeAnalysis;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Text;

namespace CodeGenerator
{
    public class AttributeDataHair : AttributeData
    {
        protected override INamedTypeSymbol? CommonAttributeClass => throw new NotImplementedException();

        protected override IMethodSymbol? CommonAttributeConstructor => throw new NotImplementedException();

        protected override SyntaxReference? CommonApplicationSyntaxReference => throw new NotImplementedException();

        protected override ImmutableArray<TypedConstant> CommonConstructorArguments => throw new NotImplementedException();

        protected override ImmutableArray<KeyValuePair<string, TypedConstant>> CommonNamedArguments => throw new NotImplementedException();
    }
}
