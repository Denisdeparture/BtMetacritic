using CodeGenerator.Data;
using CodeGenerator.ProxyClasses;
using Microsoft.CodeAnalysis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CodeGenerator;

public static class Extensions
{
    public static bool IsConstructor(this IMethodSymbol methodSymbol) => methodSymbol.MethodKind == MethodKind.Constructor;
    public static bool HasAttribute<T>(this IFieldSymbol field, IAttributeDeluxe atributefunc) where T : Attribute
    {
        var attrs = field.GetAttributes().ToList();

        var attr = attrs.Where(x => atributefunc.GetName(x) == typeof(T).Name).SingleOrDefault();

        if (attr is null)
        {
            return false;
        }

        return true;
    }

}
