using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeGenerator.Attributes
{
    public class UseableParamsAttribute : Attribute
    {
        public IList<int>? ParamsWithIndex;

        public IList<string>? ParamsWithStr;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="parametrs"> by using indexes of params/services in contructor</param>
        public UseableParamsAttribute(int[] parametrs)
        {
            ParamsWithIndex = parametrs;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="parametrs"> by using name of params/services in contructor</param>
        public UseableParamsAttribute(string[] parametrs)
        {
            ParamsWithStr = parametrs;
        }
    }
}
