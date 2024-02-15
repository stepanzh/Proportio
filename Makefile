DEBUG_DIR = debug
DEPLOY_DIR = deploy
STATIC_DIR = static

all: clear debug deploy

debug:
	mkdir -p $(DEBUG_DIR)
	cp -r $(STATIC_DIR)/* $(DEBUG_DIR)
	python3 build.py --debug -d $(DEBUG_DIR)

deploy: debug
	mkdir -p $(DEPLOY_DIR)
	cp -r $(STATIC_DIR)/* $(DEPLOY_DIR)
	python3 build.py -d $(DEPLOY_DIR)
	uglifyjs $(STATIC_DIR)/js/index.js > $(DEPLOY_DIR)/js/index.js
	uglifyjs $(STATIC_DIR)/js/examples.js > $(DEPLOY_DIR)/js/examples.js

syncss:
	cp -r $(DEBUG_DIR)/css/ $(STATIC_DIR)/css/

clear:
	rm -rf $(DEBUG_DIR)
	rm -rf $(DEPLOY_DIR)

pages: deploy
	ghp-import -n -f -p $(DEPLOY_DIR)

newpromo:
ifdef i
	cp $(i) 'static/promo.jpg'
else
	@echo "No picture specified. Usage: make newpromo i=path"
endif

.PHONY: all debug deploy clear pages newpromo
