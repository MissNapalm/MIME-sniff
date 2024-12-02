from http.server import HTTPServer, SimpleHTTPRequestHandler

class VulnerableHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.endswith('.svg'):
            self.send_response(200)
            self.send_header('Content-Type', 'image/svg+xml')  # Incorrectly serve as an image
            self.end_headers()
            with open('safe-image.svg', 'rb') as f:
                self.wfile.write(f.read())
        else:
            super().do_GET()

def run(server_class=HTTPServer, handler_class=VulnerableHandler):
    server_address = ('', 8000)
    httpd = server_class(server_address, handler_class)
    print("Serving on port 8000...")
    httpd.serve_forever()

if __name__ == "__main__":
    run()
