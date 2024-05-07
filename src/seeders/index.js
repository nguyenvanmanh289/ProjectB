import { initAdmin } from "./admin.seeder";
import { connectToDatabase } from "@/config/mongodb";
const seed = async ()=>{
    await connectToDatabase();
    await initAdmin();
}
seed();