FROM golang:1.13-alpine

# Copy all required files
WORKDIR /go/src/app
COPY . .

# Install git
RUN apk add --no-cache git

# Install all dependencies
RUN go get -d -v "github.com/google/go-github/github" "golang.org/x/oauth2"

# Install the application itself
RUN go install -v . 

CMD ["app"]