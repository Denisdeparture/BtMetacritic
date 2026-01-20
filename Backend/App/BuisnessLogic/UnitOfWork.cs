using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CodeGenerator.Attributes;
using CodeGenerator.Data;
using Data;
using Data.Models.Dto;
using Microsoft.EntityFrameworkCore;
using UnitOfWorkUpgrade.Realization;
namespace BuisnessLogic;


public partial class UnitOfWork(IDbContextFactory<MyAppContext> ctxFactory) : IUnitOFWork
{
    [UseableParams([0])]
#pragma warning disable IDE0044 // Добавить модификатор только для чтения
    private IWorker UserService;
#pragma warning restore IDE0044 // Добавить модификатор только для чтения
}
