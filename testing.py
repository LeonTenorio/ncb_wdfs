import glob, os
import subprocess
test_folder = './tests/'
test_file_type = '*.json'

os.chdir(test_folder)
for file in glob.glob(test_file_type):
    with open(file, 'r') as reader:
        file_string = reader.read()
        output_name = file.replace("test", "expected").replace("request", "response")
        request_command = "wget --body-data='"+file_string+"' --header='Content-Type:application/json' 'http://localhost:3000/ncb_wdfs' --method=GET -O "+output_name
        subprocess.Popen(request_command, shell=True).wait()