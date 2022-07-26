export class Task {

    title: string;
    description: string;
    priority: string;
    createdAt: string;
    dueTo: string;
    assignedTo: string;
    
    constructor(obj?: any) {
        this.title = obj ? obj.title : '';
        this.description = obj ? obj.description : '';
        this.priority = obj ? obj.urgency : '';
        this.createdAt = obj ? obj.createdAt : '';
        this.dueTo = obj ? obj.dueTo : '';
        this.assignedTo = obj ? obj.assignedTo : '';
    } 
    
}