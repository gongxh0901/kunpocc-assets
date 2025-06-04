import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

export default [
    {
        // 生成未压缩的 JS 文件
        input: 'src/kunpocc-assets.ts',
        external: ['cc'],
        output: [
            {
                file: 'dist/kunpocc-assets.mjs',
                format: 'esm',
                name: 'kunpocc-assets'
            },
            {
                file: 'dist/kunpocc-assets.cjs',
                format: 'cjs',
                name: 'kunpocc-assets'
            }
        ],
        plugins: [
            typescript({
                tsconfig: './tsconfig.json',
                importHelpers: false,
                compilerOptions: {
                    target: "es6",
                    module: "es6",
                    experimentalDecorators: true, // 启用ES装饰器。
                    strict: true,
                    strictNullChecks: false,
                    moduleResolution: "Node",
                    skipLibCheck: true,
                    esModuleInterop: true,
                }
            })
        ]
    },
    {
        // 生成压缩的 JS 文件
        input: 'src/kunpocc-assets.ts',
        external: ['cc'],
        output: [
            {
                file: 'dist/kunpocc-assets.min.mjs',
                format: 'esm',
                name: 'kunpocc-assets'
            },
            {
                file: 'dist/kunpocc-assets.min.cjs',
                format: 'cjs',
                name: 'kunpocc-assets'
            }
        ],
        plugins: [
            typescript({
                tsconfig: './tsconfig.json',
                importHelpers: false,
                compilerOptions: {
                    target: "es6",
                    module: "es6",
                    experimentalDecorators: true, // 启用ES装饰器。
                    strict: true,
                    strictNullChecks: false,
                    moduleResolution: "Node",
                    skipLibCheck: true,
                    esModuleInterop: true,
                }
            }),
            terser()
        ]
    },
    {
        // 生成声明文件的配置
        input: 'src/kunpocc-assets.ts',
        output: {
            file: 'dist/kunpocc-assets.d.ts',
            format: 'es'
        },
        plugins: [dts({
            compilerOptions: {
                stripInternal: true
            }
        })]
    }
]; 