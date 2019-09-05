FROM rust:1.37

WORKDIR /usr/src/projectinfo
COPY . .

RUN cargo install --path .

CMD ["projectinfo"]