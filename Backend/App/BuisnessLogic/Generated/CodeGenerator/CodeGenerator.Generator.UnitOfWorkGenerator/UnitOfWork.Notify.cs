
                    using System.ComponentModel;
                    using CodeGenerator.Data;
                    using UnitOfWorkUpgrade.Realization;
                    using UnitOfWorkUpgrade.Services;
                    namespace BuisnessLogic
                    {
                      partial class UnitOfWork
                      {
                        
                private IWorker? CompleteUser;
                public IWorker User
                {
                    get 
                    {
                       if (CompleteUser is null) CompleteUser = new CompleteUser(ctxFactory);
                       return CompleteUser;
                    }
                  
                }

                private IWorker? CompleteGame;
                public IWorker Game
                {
                    get 
                    {
                       if (CompleteGame is null) CompleteGame = new CompleteGame(first);
                       return CompleteGame;
                    }
                  
                }

                      }
                    }