
yarn docs:build

cd dist


git init
git add -A
git commit -m 'deploy'


git push -f https://github.com/Amayakite/Amayakite.github.io.git master:gh-pages

git push -f https://gitee.com/Amayakite/amayakite.gitee.io.git master
