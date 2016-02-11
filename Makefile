push:
	git commit -a -m $$(date +%d-%m-%Y/%H:%M)
	git push master
pull:
	git pull origin master
