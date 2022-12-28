build/index.html: src/index.html css javascript
	cp src/index.html build/index.html

javascript: build/script.js

build/script.js: src/script.js
	uglifyjs src/script.js > build/script.js

css: build/styles.css

build/styles.css: src/styles.css
	cp src/styles.css build/styles.css
