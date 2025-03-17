# Nastavení konfigurace pro `git pull`

Pokud se při pokusu o `git pull` zobrazí chyba:

```
fatal: Need to specify how to reconcile divergent branches.
```

znamená to, že máte odlišné změny ve vaší lokální a vzdálené větvi a Git neví, jak je sloučit. Můžete to vyřešit jedním z následujících příkazů:

## Možnosti konfigurace

1. Pokud chcete sloučit změny pomocí merge:

```sh
git config pull.rebase false
```

2. Pokud chcete sloučit změny pomocí rebase:

```sh
git config pull.rebase true
```

3. Pokud chcete povolit pouze fast-forward sloučení:

```sh
git config pull.ff only
```

## Nastavení výchozího chování

Pokud chcete nastavit výchozí chování pro všechny repozitáře, přidejte `--global`:

```sh
git config --global pull.rebase false
```

## Použití přepínače při `git pull`

Nebo můžete použít příslušný přepínač přímo při příkazu `git pull`:

```sh
git pull --rebase
```

nebo

```sh
git pull --no-rebase
```

nebo

```sh
git pull --ff-only
```

Vyberte si jednu z možností podle toho, jak chcete sloučit změny.
