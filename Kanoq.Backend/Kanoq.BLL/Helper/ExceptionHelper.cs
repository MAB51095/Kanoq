using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kanoq.BLL.Helper
{
    public static class ExceptionHelper
    {
        public static Exception GetExcpetionMessage(Exception ex)
        {
            Exception exception;

            if (ex.InnerException != null)
            {
                exception = GetExcpetionMessage(ex.InnerException);
            }
            else
            {
                exception = ex;
            }

            return exception;
        }

       
    }
}
