interface ProgressBarPropos {
    progress: number
}

export function ProgressBar(props: ProgressBarPropos) {
    return (
        <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
            <div 
                className="h-3 rounded-xl bg-violet-600"
                role="progressbar"
                aria-label="Completed habits in the selected day"
                aria-valuenow={props.progress}
                style={{ width: `${props.progress}%`}}
            />
        </div>
    )
}