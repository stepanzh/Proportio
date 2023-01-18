SOURCE_DIR = src
DEBUG_DIR = debug
DEPLOY_DIR = deploy


all: debug deploy

debug: $(SOURCE_DIR)/index.html $(SOURCE_DIR)/script.js $(SOURCE_DIR)/app.css $(SOURCE_DIR)/promo.css $(SOURCE_DIR)/examples.html
	mkdir -p $(DEBUG_DIR)
	cp -r $(SOURCE_DIR)/* $(DEBUG_DIR)
	python3 html_builder.py -m debug -f $(SOURCE_DIR)/index.html > $(DEBUG_DIR)/index.html
	python3 examples_page_builder.py -m debug -f $(SOURCE_DIR)/examples.html > $(DEBUG_DIR)/examples.html

deploy: debug
	mkdir -p $(DEPLOY_DIR)
	cp -r $(DEBUG_DIR)/* $(DEPLOY_DIR)
	python3 html_builder.py -m deploy -f $(SOURCE_DIR)/index.html > $(DEPLOY_DIR)/index.html
	python3 examples_page_builder.py -m deploy -f $(SOURCE_DIR)/examples.html > $(DEPLOY_DIR)/examples.html
	uglifyjs $(DEBUG_DIR)/script.js > $(DEPLOY_DIR)/script.js

pages: deploy
	ghp-import -n -f -p $(DEPLOY_DIR)

clear:
	rm -rf $(DEBUG_DIR)
	rm -rf $(DEPLOY_DIR)
