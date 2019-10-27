all: build

build:
	docker build -t projectinfo-alpine .

dockerimage:
	docker run -it -p9999:80 -ePROJECTINFO_CONFIG_FILE=/etc/conf/projectinfo.conf -v/etc/conf/:/etc/conf/ -w/etc/conf projectinfo-alpine