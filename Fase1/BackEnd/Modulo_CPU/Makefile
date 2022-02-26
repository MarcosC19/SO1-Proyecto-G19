obj-m += cpu_grupo19.o
all:
	make -C /lib/modules/$(shell uname -r)/build M=$(shell pwd)
clean:
	make -C /lib/modules/$(shell uname -r)/build M=$(shell pwd) clean
run:
	sudo insmod ./cpu_grupo19.ko
remove:
	sudo rmmod ./cpu_grupo19.ko