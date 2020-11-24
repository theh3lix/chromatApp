using System;
using System.IO;
using System.Linq;

namespace chromat.Services
{
    public class MiscService
    {
        public MiscService()
        {
        }

        public void RenameDirectories(string dirPath)
        {
            DirectoryInfo dir = new DirectoryInfo(dirPath);
            var subdirs = dir.GetDirectories();
            int i;
            foreach(var subdirectory in subdirs)
            {
                i = 1;
                var cnt = subdirectory.GetFiles().Length;
                foreach(var file in subdirectory.GetFiles())
                {
                    var fileCounter = file.Name.Split('_').Last().Split('.').First();
                    var newFileName = file.Name.Substring(0, file.Name.LastIndexOf(fileCounter, StringComparison.CurrentCulture)) + i + $"{file.Extension}";
                    // if (File.Exists($"{subdirectory.FullName}/{newFileName}"))
                    // File.Delete($"{subdirectory.FullName}/{newFileName}");
                    file.MoveTo($"{subdirectory.FullName}/{newFileName}");
                    i++;
                }
            }
        }
    }
}
