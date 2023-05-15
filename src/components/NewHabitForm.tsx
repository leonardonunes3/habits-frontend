import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from "phosphor-react";
import { useState } from 'react';
import { FormEvent } from 'react';
import { api } from '../lib/axios';


const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
]

export function NewHabitForm() {
    const [title, setTitle] = useState('');
    const [checkedWeekDays, setCheckedWeekDays] = useState<number[]>([]);

    async function createNewHabit(event: FormEvent) {
        event.preventDefault()

        if( !title || checkedWeekDays.length == 0) {
            return
        }

        console.log(title, checkedWeekDays)

        await api.post('habits', {
            title: title,
            weekDays: checkedWeekDays,
        })

        alert("Habit created successfully!")
        setTitle('')
        setCheckedWeekDays([])
    }

    function handleToggleWeekDay(weekDay: number) {
        if(checkedWeekDays.includes(weekDay)) {
            setCheckedWeekDays(checkedWeekDays.filter(day => day != weekDay))
        } else {
            setCheckedWeekDays([...checkedWeekDays, weekDay])
        }
    }

    return (
        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
                What's your commitment?
            </label>

            <input 
                type="text"
                id="title"
                placeholder="e.g exercises, sleep weel, etc.."
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
                autoFocus
                value={title}
                onChange={event => setTitle(event.target.value)}
            />

            <label htmlFor="" className="font-semibold leading-tight mt-4">
                What's the recurrence?
            </label>

            <div className="mt-3 flex flex-col gap-2">

                {weekDays.map((weekDay, index) => {
                    return (
                        <Checkbox.Root 
                            key={weekDay} 
                            className='flex items-center gap-3 group'
                            checked={checkedWeekDays.includes(index)}
                            onCheckedChange={() => handleToggleWeekDay(index)}
                        >
                            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'>
                                <Checkbox.CheckboxIndicator>
                                    <Check size={20} className='text-white'/>
                                </Checkbox.CheckboxIndicator>
                            </div>

                            <span className='text-white leading-tight'>
                                {weekDay}
                            </span>
                        </Checkbox.Root>
                    )
                })}
                            
            </div>

            <button type="submit" className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500">
                <Check size={20} weight="bold"/>
                Apply
            </button>
        </form>
    )
}