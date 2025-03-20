FROM node:20.19.0

# 安装 ssh 服务，用于支持 VSCode 客户端通过 Remote-SSH 访问开发环境
RUN apt-get update && apt-get install -y git wget unzip openssh-server

RUN curl -fsSL https://code-server.dev/install.sh | sh \
  && code-server --install-extension redhat.vscode-yaml \
  && code-server --install-extension dbaeumer.vscode-eslint \
  && code-server --install-extension eamodio.gitlens \
  && code-server --install-extension tencent-cloud.coding-copilot \
  && code-server --install-extension dsznajder.es7-react-js-snippets \
  && code-server --install-extension christian-kohler.npm-intellisense \
  && code-server --install-extension christian-kohler.path-intellisense \
  && code-server --install-extension bradlc.vscode-tailwindcss \
  && echo done

# 指定字符集支持命令行输入中文（根据需要选择字符集）
ENV LANG C.UTF-8
ENV LANGUAGE C.UTF-8