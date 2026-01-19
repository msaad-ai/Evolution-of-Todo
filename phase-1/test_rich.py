from rich.console import Console
from rich.table import Table
from rich import print

# Test if rich is working properly
print("[bold blue]TODO CONSOLE APPLICATION[/bold blue]")

table = Table(show_header=False, box=None)
table.add_column(style="cyan", width=2)
table.add_column(style="white")

table.add_row("[bold yellow]1.[/bold yellow]", "[bold white]Add Task[/bold white]")
table.add_row("[bold yellow]2.[/bold yellow]", "[bold white]View All Tasks[/bold white]")
table.add_row("[bold yellow]3.[/bold yellow]", "[bold white]Update Task[/bold white]")
table.add_row("[bold yellow]4.[/bold yellow]", "[bold white]Delete Task[/bold white]")
table.add_row("[bold yellow]5.[/bold yellow]", "[bold white]Toggle Task Status[/bold white]")
table.add_row("[bold yellow]6.[/bold yellow]", "[bold white]Exit[/bold white]")

print(table)