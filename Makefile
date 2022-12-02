
default: css

build:
	@npm run build

deploy:
	@netlify deploy --prod

css:
	@sass themes.scss:src/PointApp/Themes.css

.PHONY: build
