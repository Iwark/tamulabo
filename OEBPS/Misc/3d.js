 /**
             * Delegate �̓X�R�[�v�̈Ϗ����������郆�[�e�B���e�B�[�N���X�ł��B
             */
            var Delegate = {
                /**
                 * �X�R�[�v���ڏ������֐����쐬���܂��B
                 * @param func ���s�������֐�
                 * @param thisObj �ڏ��������X�R�[�v
                 * @return Function �ڏ��ς݂̊֐�
                 */
                create: function(func, thisObj){
                    var del = function(){
                        return func.apply(thisObj, arguments);
                    };
                    //���͊֐��̃v���p�e�B�Ƃ��Ē�`����
                    del.func = func;
                    del.thisObj = thisObj;
                    return del;
                }
            };
            
            /**
             * ���C���N���X�ł��B
             */
            function Main(){
                this.initialize(this, arguments);
            }
            
            /**
             * [�萔]�@�t���[�����[�g�ł��B
             */
            Main.FPS = 60;
            /**
             * [�萔]�@�X�N���[���̉���(�P�ʁFpx)�ł��B
             */
            Main.SCREEN_W = 320;
            /**
             * [�萔]�@�X�N���[���̍���(�P�ʁFpx)�ł��B
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
                 * ���������s�Ȃ��܂��B
                 */
                initialize: function(){
                    // 
                    // 3D������
                    // 
					 // �J�����̏�����
                    this.camera = new THREE.Camera(60, Main.SCREEN_W / Main.SCREEN_H, 1, 10000);
                    // �����_���[�̏�����
                    this.renderer = new THREE.CanvasRenderer();
                    document.getElementById("container").appendChild(this.renderer.domElement); // #container �ɒǉ�
                    this.renderer.setSize(Main.SCREEN_W, Main.SCREEN_H);
                    // 3D�V�[���̏�����
                    this.scene = new THREE.Scene();
                    
                    // 
                    // �R���e���c�̍쐬
                    // 
                    // �n��
                    var mat = new THREE.MeshColorStrokeMaterial(0xe0e0e0, 1, 1);
                    var plane = new THREE.Mesh(new Plane(1000, 1000, 10, 10), mat);
                    plane.rotation.x = -90 * (Math.PI / 180);
                    this.scene.addObject(plane);
                    
                    // ��
                    // ���̉H�̑f�ނ��쐬(PNG�t�@�C����ǂݍ���)
                    var matL = this._loadImage("../Misc/butterfly_wind_r.png");
                    var matR = this._loadImage("../Misc/butterfly_wind_l.png");
                    
                    // ���̉H��\��t���镽�ʂ��쐬
                    this._wingLeft = new THREE.Mesh(new Plane(200, 200, 1, 1), matL);
                    this._wingRight = new THREE.Mesh(new Plane(200, 200, 1, 1), matR);
                    
                    // �s��v�Z���g�����߁A�����X�V��OFF�ɂ���
                    this._wingLeft.autoUpdateMatrix = false;
                    this._wingRight.autoUpdateMatrix = false;
                    
                    // �V�[���ɒǉ�
                    this.scene.addObject(this._wingLeft);
                    this.scene.addObject(this._wingRight);
                },
                /**
                 * �Đ����܂��B
                 */
                play: function(){
                    // �A�j���[�V���� 
                    this._intervalId = setInterval(Delegate.create(this._intervalHandler, this), 1000 / Main.FPS);
                },
                /**
                 * ��~���܂��B
                 */
                stop: function(){
                    clearInterval(this._intervalId);
                },
                
                /**
                 * �摜��URL����Material�C���X�^���X���쐬���܂��B
                 * @param {String} �摜��URL�ł��B
                 * @return {THREE.MeshBitmapUVMappingMaterial} �}�e���A��
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
                 * setInterval�̃n���h���[�ł��B
                 */
                _intervalHandler: function(){
                
                    // �A�j���[�V�����̐ݒ�
                    // �����̉H��
                    var ml = this._wingLeft.matrix;
                    ml.identity();
                    ml.multiplySelf(THREE.Matrix4.translationMatrix(-100, Math.sin(this._count / 10) * -25 + 240, 0));
                    ml.multiplySelf(THREE.Matrix4.translationMatrix(100, 0, 0));
                    ml.multiplySelf(THREE.Matrix4.rotationZMatrix(Math.sin(this._count / 10) * 40 * Math.PI / 180));
                    ml.multiplySelf(THREE.Matrix4.translationMatrix(-100, 0, 0));
                    ml.multiplySelf(THREE.Matrix4.rotationXMatrix(-Math.PI / 2));
                    
                    // �E���̉H��
                    var mr = this._wingRight.matrix;
                    mr.identity();
                    mr.multiplySelf(THREE.Matrix4.translationMatrix(100, Math.sin(this._count / 10) * -25 + 240, 0));
                    mr.multiplySelf(THREE.Matrix4.translationMatrix(-100, 0, 0));
                    mr.multiplySelf(THREE.Matrix4.rotationZMatrix(Math.sin(this._count / 10) * -40 * Math.PI / 180));
                    mr.multiplySelf(THREE.Matrix4.translationMatrix(100, 0, 0));
                    mr.multiplySelf(THREE.Matrix4.rotationXMatrix(-Math.PI / 2));
                    
                    // �J�����̓���
                    this.camera.position.x = 500 * Math.sin(this._count / 80);
                    this.camera.position.y = 700;
                    this.camera.position.z = 500 * Math.cos(this._count / 80);
                    
                    // �����_�����O
                    this.renderer.render(this.scene, this.camera);
                    
                    // �����^�����O�J�E���g 
                    this._count++;
                }
            };
      
            var main = new Main();
            main.play();