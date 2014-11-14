require 'webrick'
include WEBrick

HTTPServer.new(:Port => 8251, :DocumentRoot => Dir::pwd).start
