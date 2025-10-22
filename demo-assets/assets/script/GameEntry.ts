import { _decorator, Asset, assetManager, Component, Label, Prefab, profiler, ProgressBar, SpriteFrame } from "cc";
import { AssetLoader, AssetPool, IAssetConfig } from "kunpocc-assets";
// import * as KunpoAssets from "kunpocc-assets";

const { ccclass, property, menu } = _decorator;
@ccclass("GameEntry")
@menu("kunpo/GameEntry")
export class GameEntry extends Component {
    @property(ProgressBar)
    private progressBar: ProgressBar;

    @property(Label)
    private progressText: Label;

    protected onEnable(): void {
        profiler.hideStats();
        console.log(`资源池中的资源数量:${assetManager.assets.count}`);
    }

    private onLoadAssets(): void {
        console.log(`------------------------------------------------`);
        console.log("load");
        let configs: IAssetConfig[] = [
            { path: "config" },
            { path: "icon", type: SpriteFrame },
            { path: "prefab", type: Prefab },
            { path: "ui", type: Asset },
        ]
        let loader = new AssetLoader("basics");
        loader.parallel = 1;
        loader.setCallbacks({
            complete: () => {
                console.log("资源加载完成");
            },
            fail: (code: number, msg: string) => {
                console.error(`资源加载失败 code: ${code} msg: ${msg}`);
            },
            progress: (progress) => {
                // console.log(`资源加载进度:${progress}`);
                this.progressBar.progress = progress;
                this.progressText.string = `${Math.floor(progress * 100)}%`;
            }
        });
        loader.start(configs);
    }

    /** 卸载config文件夹下的资源 */
    private onUnloadConfigAssets(): void {
        console.log(`------------------------------------------------`);
        console.log("卸载【config】文件夹下的资源");
        AssetPool.releaseDir("config");
        // 卸载后剩余的资源
        let paths1 = AssetPool.getAllAssetPaths();
        paths1.forEach(path => {
            console.log(`卸载【config】后的剩余资源:${path}`);
        });
        console.log(`kunpocc 缓存池中的资源数量：共【${paths1.length}】个资源`);

        setTimeout(() => {
            console.log(`cocos资源缓存池中的资源数量:${assetManager.assets.count}`);
        }, 0);
    }

    private onUnloadAssets(): void {
        console.log(`------------------------------------------------`);

        console.log("卸载【basics】批次的所有资源");
        AssetPool.releaseBatchAssets("basics");

        let paths2 = AssetPool.getAllAssetPaths();
        paths2.forEach(path => {
            console.log(`卸载【basics】后的剩余资源:${path}`);
        });
        console.log(`kunpocc 缓存池中的资源数量：共【${paths2.length}】个资源`);

        setTimeout(() => {
            console.log(`cocos资源缓存池中的资源数量:${assetManager.assets.count}`);
        }, 0);
    }

    private onLogAssets(): void {
        console.log(`------------------------------------------------`);
        let paths = AssetPool.getAllAssetPaths();
        paths.forEach(path => {
            console.log(`资源池中的资源:${path}`);
        });
        console.log(`缓存池中的资源数量：共【${paths.length}】个资源`);
        console.log(`cocos资源缓存池中的资源数量:${assetManager.assets.count}`);
    }
}