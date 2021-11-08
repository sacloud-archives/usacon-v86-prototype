# usacon-v86-prototype

From: https://github.com/sacloud/usacon/issues/90

Usacloudを[copy/v86](https://github.com/copy/v86) の上で動かすための実装プロトタイプ

## 利用方法

[https://sacloud.github.io/usacon-v86-prototype/](https://sacloud.github.io/usacon-v86-prototype/)

:warning: 注意点

さくらのクラウドへのAPIリクエストは実際には行われません。  
選択しているプロファイルによりページホストへのHTTPリクエスト or Fakeドライバーによる処理が行われます。  
プロファイルは以下の2つを提供しています。

- `defalt`: ページをホストしているサーバに対しAPIリクエストを行うためのプロファイル  
  `usacloud auth-status`コマンドにのみ対応しています。
- `fake`: Fakeドライバが有効なプロファイル

プロファイルの切り替えは`usacloud profile use <プロファイル名>`コマンドで行います。


### このプロジェクトのライセンス

`usacon-v86-prototype` Copyright (C) 2021 Kazumichi Yamamoto

This project is published under [Apache 2.0 License](LICENSE).

### OSSライセンス

以下のプロダクトをカスタマイズして利用しています。

- [copy/v86](https://github.com/copy/v86)
- [humphd/browser-vm](https://github.com/humphd/browser-vm)

それぞれのカスタマイズ部分についてはこのプロジェクトのライセンスを適用します。
