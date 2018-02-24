FROM ubuntu:16.04

# `build-essential` and `file` are needed for backtrace-sys
# `cmake`, `git`, `python` are needed for wasm tools
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    curl \
    file \
    gcc \
    git \
    libssl-dev \
    pkg-config \
    python \
    sudo \
 && rm -rf /var/lib/apt/lists/*

RUN useradd -m playground -d /playground
RUN usermod -p '!!' root # Disable all passwords for root
USER playground
ENV USER=playground
ENV PATH=/playground/.cargo/bin:$PATH

ARG channel

# Ensure that we are using the latest stable version of rustup and the
# latest version of the current channel. A new manifest will trigger
# these lines to run again, forcing a new download of rustup and
# installation of Rust.
ADD https://static.rust-lang.org/rustup/release-stable.toml /playground/tools/rustup-manifest.toml
ADD https://static.rust-lang.org/dist/channel-rust-${channel}-date.txt /playground/tools/rust-channel-version

RUN curl https://sh.rustup.rs -sSf | sh -s -- -y --default-toolchain "${channel}"

RUN cd /tmp && \
    cargo new playground && \
    mv /tmp/playground/* /playground/
WORKDIR /playground

RUN mv Cargo.toml Cargo.toml.original
ADD Cargo.toml /playground/Cargo.toml
RUN cargo build
RUN cargo build --release
RUN rm src/*.rs

ADD crate-information.json /playground/crate-information.json

ADD postinstall.sh /playground/tools/
RUN /playground/tools/postinstall.sh ${channel}
ADD cargo-wasm /playground/.cargo/bin/

# We drop root privileges in the entrypoint
USER root
ADD entrypoint.sh /playground/tools/
ENTRYPOINT ["/playground/tools/entrypoint.sh"]
