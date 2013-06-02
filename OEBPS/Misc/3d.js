 /**
             * Delegate はスコープの委譲を処理するユーティリティークラスです。
             */
            var Delegate = {
                /**
                 * スコープを移譲した関数を作成します。
                 * @param func 実行したい関数
                 * @param thisObj 移譲したいスコープ
                 * @return Function 移譲済みの関数
                 */
                create: function(func, thisObj){
                    var del = function(){
                        return func.apply(thisObj, arguments);
                    };
                    //情報は関数のプロパティとして定義する
                    del.func = func;
                    del.thisObj = thisObj;
                    return del;
                }
            };
            
            /**
             * メインクラスです。
             */
            function Main(){
                this.initialize(this, arguments);
            }
            
            /**
             * [定数]　フレームレートです。
             */
            Main.FPS = 60;
            /**
             * [定数]　スクリーンの横幅(単位：px)です。
             */
            Main.SCREEN_W = 320;
            /**
             * [定数]　スクリーンの高さ(単位：px)です。
             */
            Main.SCREEN_H = 240;
            
            Main.prototype = {
            
                camera: null,
                scene: null,
                renderer: null,
                
                _wingLeft: null,
                _wingRight: null,
                _count: 0,
                _intervalId: 0,
                
                /**
                 * 初期化を行ないます。
                 */
                initialize: function(){
                    // 
                    // 3D初期化
                    // 
					 // カメラの初期化
                    this.camera = new THREE.Camera(60, Main.SCREEN_W / Main.SCREEN_H, 1, 10000);
                    // レンダラーの初期化
                    this.renderer = new THREE.CanvasRenderer();
                    document.getElementById("container").appendChild(this.renderer.domElement); // #container に追加
                    this.renderer.setSize(Main.SCREEN_W, Main.SCREEN_H);
                    // 3Dシーンの初期化
                    this.scene = new THREE.Scene();
                    
                    // 
                    // コンテンツの作成
                    // 
                    // 地面
                    var mat = new THREE.MeshColorStrokeMaterial(0xe0e0e0, 1, 1);
                    var plane = new THREE.Mesh(new Plane(1000, 1000, 10, 10), mat);
                    plane.rotation.x = -90 * (Math.PI / 180);
                    this.scene.addObject(plane);
                    
                    // 蝶
                    // 蝶の羽の素材を作成(PNGファイルを読み込み)
                    var matL = this._loadImage("../Misc/butterfly_wind_r.png");
                    var matR = this._loadImage("../Misc/butterfly_wind_l.png");
                    
                    // 蝶の羽を貼り付ける平面を作成
                    this._wingLeft = new THREE.Mesh(new Plane(200, 200, 1, 1), matL);
                    this._wingRight = new THREE.Mesh(new Plane(200, 200, 1, 1), matR);
                    
                    // 行列計算を使うため、自動更新をOFFにする
                    this._wingLeft.autoUpdateMatrix = false;
                    this._wingRight.autoUpdateMatrix = false;
                    
                    // シーンに追加
                    this.scene.addObject(this._wingLeft);
                    this.scene.addObject(this._wingRight);
                },
                /**
                 * 再生します。
                 */
                play: function(){
                    // アニメーション 
                    this._intervalId = setInterval(Delegate.create(this._intervalHandler, this), 1000 / Main.FPS);
                },
                /**
                 * 停止します。
                 */
                stop: function(){
                    clearInterval(this._intervalId);
                },
                
                /**
                 * 画像のURLからMaterialインスタンスを作成します。
                 * @param {String} 画像のURLです。
                 * @return {THREE.MeshBitmapUVMappingMaterial} マテリアル
                 */
                _loadImage: function(path){
                
                    var canvas = document.createElement('canvas');
                    canvas.width = 32;
                    canvas.height = 32;
                    
                    var material = new THREE.MeshBitmapUVMappingMaterial(canvas);
                    
                    var image = new Image();
                    image.onload = function(){
                        material.bitmap = this;
                    };
                    image.src = path;
                    
                    return material;
                },
                
                /**
                 * setIntervalのハンドラーです。
                 */
                _intervalHandler: function(){
                
                    // アニメーションの設定
                    // 左側の羽根
                    var ml = this._wingLeft.matrix;
                    ml.identity();
                    ml.multiplySelf(THREE.Matrix4.translationMatrix(-100, Math.sin(this._count / 10) * -25 + 240, 0));
                    ml.multiplySelf(THREE.Matrix4.translationMatrix(100, 0, 0));
                    ml.multiplySelf(THREE.Matrix4.rotationZMatrix(Math.sin(this._count / 10) * 40 * Math.PI / 180));
                    ml.multiplySelf(THREE.Matrix4.translationMatrix(-100, 0, 0));
                    ml.multiplySelf(THREE.Matrix4.rotationXMatrix(-Math.PI / 2));
                    
                    // 右側の羽根
                    var mr = this._wingRight.matrix;
                    mr.identity();
                    mr.multiplySelf(THREE.Matrix4.translationMatrix(100, Math.sin(this._count / 10) * -25 + 240, 0));
                    mr.multiplySelf(THREE.Matrix4.translationMatrix(-100, 0, 0));
                    mr.multiplySelf(THREE.Matrix4.rotationZMatrix(Math.sin(this._count / 10) * -40 * Math.PI / 180));
                    mr.multiplySelf(THREE.Matrix4.translationMatrix(100, 0, 0));
                    mr.multiplySelf(THREE.Matrix4.rotationXMatrix(-Math.PI / 2));
                    
                    // カメラの動き
                    this.camera.position.x = 500 * Math.sin(this._count / 80);
                    this.camera.position.y = 700;
                    this.camera.position.z = 500 * Math.cos(this._count / 80);
                    
                    // レンダリング
                    this.renderer.render(this.scene, this.camera);
                    
                    // レンタリングカウント 
                    this._count++;
                }
            };
      
            var main = new Main();
            main.play();