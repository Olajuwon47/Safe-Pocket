import * as React from "react"
import { Button } from "./ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

interface AddGoalProps {
  onAddGoal: (title: string, target: number) => void
}

export function AddGoal({ onAddGoal }: AddGoalProps) {
  const [title, setTitle] = React.useState("")
  const [target, setTarget] = React.useState("")
  const [open, setOpen] = React.useState(false)

  const handleAddGoal = () => {
    const targetNumber = parseFloat(target)
    if (title && !isNaN(targetNumber) && targetNumber > 0) {
      onAddGoal(title, targetNumber)
      setTitle("")
      setTarget("")
      setOpen(false)
    }
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="bg-lime-500">Add New Goal</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add New Goal</DrawerTitle>
          <DrawerDescription>
            Set a new savings goal. Enter a title and a target amount for your goal.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="target" className="text-right">
                Target
              </Label>
              <Input
                id="target"
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button type="submit" onClick={handleAddGoal}
          className="
                    w-full min-w-[130px] h-10 
                    text-white font-bold 
                    px-2.5 py-1.5 
                    relative inline-block 
                    rounded-md border-none outline-none 
                    cursor-pointer transition-all duration-300 ease-in-out 
                    bg-[#80ed99] shadow-[0_5px_0_#57cc99]
                    hover:shadow-[0_3px_0_#57cc99] hover:top-[1px]
                    active:shadow-[0_0px_0_#57cc99] active:top-[5px]
                  ">
            Add Goal
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
