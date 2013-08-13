import fnmatch
import os
import tornado.ioloop
import tornado.web
import json
import string
import urllib

patterns = ["*.mp3","*.aiff","*.ogg","*.m4a"]
rootPath = "C:/Users/Jacob/Music/Music Prior to 2nd Re-flash/"
htmlPath = "C:/Users/Jacob/Documents/Python/Drop In Music Server/html/"

class MainHandler(tornado.web.RequestHandler):
    def post(self):
        q_str = self.get_argument("query_string","")
        args = json.loads(q_str)
        folders = folder_search(rootPath + args['folder'])
        files = file_search(patterns,rootPath+args['folder'])
        ret_files = []
        ret_folders = []
        for fn in files:
            ret_files.append(fn[len(rootPath):])
        for fln in folders:
            ret_folders.append(fln[len(rootPath):])
        ret_str_dict = {
            "files":ret_files,
            "folders":ret_folders
            }
        
        ret_str = json.dumps(ret_str_dict)
        self.write(ret_str)
    
class FileHandler(tornado.web.RequestHandler):
    def post(self):
        
        q_str = self.get_argument("query_string","")
        args = json.loads(q_str)
        ret_str_dict = {
            "url":"../static/files/"+ args["file"].replace("\\","/")
            }
        
        self.write(json.dumps(ret_str_dict))
        
class SearchHandler(tornado.web.RequestHandler):
    def post(self):
        q_str = self.get_argument("query_string","")
        print q_str
        args = json.loads(q_str)
        search_for = args["search_for"]
        good_files = []
        ret_files = []
        bad_files =[] 
        for f in rootScan:
            try:
                if search_for in f:
                    good_files.append(f)
            except:
                
                bad_files.append(f)
        for fn in good_files:
            ret_files.append(fn[len(rootPath):])
        self.write(json.dumps({"files":ret_files,"bad":len(bad_files)}))
                
class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("<meta http-equiv='refresh' content='0; url=site/index.html'>");
                
        
        













def to_file(data):
    fp = open("temp.txt","w")
    fp.write(data)
    fp.close()

def folder_search(rootPath):
    arr = []
    for dirname in os.listdir(rootPath):
        if(os.path.isdir(os.path.join(rootPath,dirname))):
            arr.append(os.path.join(rootPath,dirname))
    return arr
def recursive_folder_search(rootPath):
    arr = []
    for dirname, dirnames, filenames in os.walk(rootPath):
        for subdirname in dirnames:
            arr.append(os.path.join(dirname, subdirname))
    return arr
            
def file_search(patterns,rootPath):
    arr = []
    for f in os.listdir(rootPath):
        for pattern in patterns:
            name,ext = os.path.splitext(f)
            if ext == pattern[1:]:
                arr.append(os.path.join(rootPath,f))
            
    return arr

    
def recursive_file_search(patterns,rootPath):
    arr = []
    for root, dirs, files in os.walk(rootPath):
        for pattern in patterns:
            for filename in fnmatch.filter(files, pattern):
                arr.append(os.path.join(root, filename))
    return arr
def url_safety(data):
    return urllib.quote_plus(data)



application = tornado.web.Application([
    (r"/",IndexHandler),
    (r"/api/folder", MainHandler),
    (r"/api/file", FileHandler),
    (r"/api/search", SearchHandler),
    (r'/static/files/(.*)', tornado.web.StaticFileHandler, {'path': rootPath}),
    (r'/site/(.*)', tornado.web.StaticFileHandler, {'path': htmlPath}),
])
rootScan = recursive_file_search(patterns,rootPath)
if __name__ == "__main__":
    application.listen(raw_input("Port:"))
    tornado.ioloop.IOLoop.instance().start()
    #print folder_search(rootPath)
    




