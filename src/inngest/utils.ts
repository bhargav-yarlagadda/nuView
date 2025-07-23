import Sandbox from "@e2b/code-interpreter";

export async function getSandBox(sandBoxId:string){
    const sandBox = await Sandbox.connect(sandBoxId)
    return sandBox
}