using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.Operations;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Globalization;
using System.Reflection.Metadata;
using System.Diagnostics;
using CodeGenerator.Data;
using CodeGenerator.ProxyClasses;

namespace CodeGenerator.Generator
{
    [Generator(LanguageNames.CSharp)]
    public class UnitOfWorkGenerator : ISourceGenerator
    {
        public void Execute(GeneratorExecutionContext context)
        {
            var serviceForTypedConstant = new Paimon();

            var serviceForAttributeData = new AttributeDataDeluxe();

            var logic = new GeneratorLogic(serviceForTypedConstant, serviceForAttributeData);

            var generator = new GeneratorWriter(logic);

            var comp = context.Compilation;

            var uowType = comp.GetTypeByMetadataName(typeof(IUnitOFWork).FullName!);

            foreach (var syntaxTree in comp.SyntaxTrees)
            {
                var semanticModel = comp.GetSemanticModel(syntaxTree);

                var immutableHashSet = syntaxTree.GetRoot()
                .DescendantNodesAndSelf()
                    .OfType<ClassDeclarationSyntax>()
                    .Select(x => semanticModel.GetDeclaredSymbol(x))
                .OfType<ITypeSymbol>()
                    .Where(x => x.Interfaces.Contains(uowType!))
                .ToImmutableHashSet();

                foreach (var typeSymbol in immutableHashSet)
                {
                    var source = generator.GetPatternOfNewClasses(typeSymbol);

                    context.AddSource($"{typeSymbol.Name}.Notify.cs", source);
                }
            }
        }
        public void Initialize(GeneratorInitializationContext context)
        {
        }

    }
}
