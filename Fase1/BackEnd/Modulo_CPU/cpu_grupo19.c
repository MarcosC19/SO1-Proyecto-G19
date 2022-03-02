#include <linux/kernel.h>
#include <linux/module.h>
#include <linux/init.h>
#include <linux/sched/signal.h>
#include <linux/sched.h>
#include <linux/proc_fs.h>
#include <linux/seq_file.h>

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Steven Jocol");
MODULE_DESCRIPTION("Modulo que muestra los procesos del sistema/usuario");
MODULE_VERSION("1.0");

struct task_struct *task;        /*    Structure defined in sched.h for tasks/processes    */
struct task_struct *task_child;        /*    Structure needed to iterate through task children    */
struct list_head *list;            /*    Structure needed to iterate through the list in each task->children struct    */

static int escribir_proc(struct seq_file *m, void *v){

    seq_printf(m, "[\n");
    bool pfirst = true;
    for_each_process( task ){
        if(pfirst){
            seq_printf(m, "\t{\n");
            pfirst = false;
        }else{
            seq_printf(m, ",\n\t{\n");
        }
        seq_printf(m, "\t\t\"pid\": %d,\n\t\t\"name\": \"%s\",\n\t\t\"ppid\": 0,\n\t\t\"state\": %ld,\n\t\t\"childs\": [",task->pid, task->comm, task->state);
        bool first = true;
        list_for_each(list, &task->children){                        /*    list_for_each MACRO to iterate through task->children    */
            task_child = list_entry( list, struct task_struct, sibling );    /*    using list_entry to declare all vars in task_child struct    */
            if(first){
                seq_printf(m,"\n\t\t\t{\n\t\t\t\t\"ppid\": %d,\n\t\t\t\t\"pid\": %d,\n\t\t\t\t\"name\": \"%s\",\n\t\t\t\t\"state\": %ld \n\t\t\t}",task->pid, /*    log child of and child pid/name/state    */
                task_child->pid, task_child->comm, task_child->state);
            }else{
                seq_printf(m,",\n\t\t\t{\n\t\t\t\t\"ppid\": %d,\n\t\t\t\t\"pid\": %d,\n\t\t\t\t\"name\": \"%s\",\n\t\t\t\t\"state\": %ld \n\t\t\t}",task->pid, /*    log child of and child pid/name/state    */
                task_child->pid, task_child->comm, task_child->state);
            }
            first = false;
        }
        seq_printf(m, "\t\t]\n\t}");
    }
    seq_printf(m, "\n]");
    return 0;
}

static int __init processinfo_init(void) {
    proc_create_single("cpu_grupo19", 0, NULL, escribir_proc);
    printk(KERN_INFO "Módulo CPU del Grupo 19 Cargado\n");
    return 0;
}
 
static void __exit processinfo_exit(void){
    remove_proc_entry("cpu_grupo19", NULL);    
    printk(KERN_INFO "Módulo CPU del Grupo 19 Desmontado\n");
}

module_init(processinfo_init);
module_exit(processinfo_exit); 
