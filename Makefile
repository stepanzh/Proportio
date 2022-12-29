SOURCE_DIR = src
DEBUG_DIR = debug
DEPLOY_DIR = deploy


all: debug deploy

debug: $(SOURCE_DIR)/index.html $(SOURCE_DIR)/script.js $(SOURCE_DIR)/styles.css
	mkdir -p $(DEBUG_DIR)
	cp $(SOURCE_DIR)/index.html $(DEBUG_DIR)
	cp $(SOURCE_DIR)/styles.css $(DEBUG_DIR)
	cp $(SOURCE_DIR)/script.js $(DEBUG_DIR)

deploy: debug
	mkdir -p $(DEPLOY_DIR)
	cp $(DEBUG_DIR)/index.html $(DEPLOY_DIR)
	cp $(DEBUG_DIR)/styles.css $(DEPLOY_DIR)
	uglifyjs $(DEBUG_DIR)/script.js > $(DEPLOY_DIR)/script.js

pages: deploy
	ghp-import -n -f -p $(DEPLOY_DIR)

clear:
	rm -rf $(DEBUG_DIR)
	rm -rf $(DEPLOY_DIR)
