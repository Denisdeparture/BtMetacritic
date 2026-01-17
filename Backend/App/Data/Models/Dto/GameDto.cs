using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models.Dto
{
    public class GameDto
    {
        public int Id { get; set; }
        public string? Title { get; set; }

        public List<UserDto>? UserLikedIt { get; set; }
    }
}
