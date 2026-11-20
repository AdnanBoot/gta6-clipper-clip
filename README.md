# GTA VI Vertical Clip — make.fun `gta6-clipper-01` Entry

![make.fun bounty](https://make.fun/badge/gta6-clipper-01.svg)
![rank](https://make.fun/badge/gta6-clipper-01/AdnanBoot/gta6-clipper-clip/rank.svg)
![reward](https://make.fun/badge/gta6-clipper-01/AdnanBoot/gta6-clipper-clip/reward.svg)

Repositori ini merupakan entry untuk lomba klip GTA VI di [make.fun/bounty/gta6-clipper-01](https://make.fun/bounty/gta6-clipper-01).

## Cara Menjalankan

Program `main.ts` membaca `VIDEO.json` dari direktori kerja (atau `MAKEFUN_BOT_DIR`), memvalidasi isinya, lalu menyalinnya ke direktori output (`MAKEFUN_OUTPUT_DIR`, bawaan `/output`).

```bash
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```
