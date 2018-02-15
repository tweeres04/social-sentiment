# Build sentiment bundle
browserify node_modules/sentiment/lib/index.js -o node_modules/sentiment/sentiment.bundle.js --standalone sentiment

# Remove existing dir
rm -r bin;

# Make dependencies dir
mkdir -p bin/node_modules/sentiment && \
mkdir bin/node_modules/chroma-js && \

# Copy dependencies
cp node_modules/sentiment/sentiment.bundle.js bin/node_modules/sentiment && \
cp node_modules/chroma-js/chroma.min.js bin/node_modules/chroma-js && \

# Copy extension code
cp content-script.js icon.png manifest.json bin

# Zip
zip -r social-sentiment.zip bin
