$(document).ready(function () {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    $('#expense-date').val(formattedDate);
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    renderExpenses();
    updateSummary();
    $('#expense-form').on('submit', function (e) {
        e.preventDefault();
        const name = $('#expense-name').val();
        const amount = parseFloat($('#expense-amount').val());
        const date = $('#expense-date').val();
        const category = $('#expense-category').val();
        const notes = $('#expense-notes').val();
        const newExpense = {
            id: Date.now(),
            name,
            amount,
            date,
            category,
            notes
        };
        expenses.push(newExpense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        $('#expense-form')[0].reset();
        $('#expense-date').val(formattedDate);
        renderExpenses();
        updateSummary();
        showAlert('Expense added successfully!', 'success');
    });
    $(document).on('click', '.btn-delete', function () {
        const id = $(this).data('id');
        expenses = expenses.filter(expense => expense.id !== id);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
        updateSummary();
        showAlert('Expense deleted successfully!', 'danger');

    });
    $('#filter-category, #sort-expenses').on('change', renderExpenses);
    function renderExpenses() {
        const list = $('#expense-list');
        const empty = $('#empty-state');
        const filter = $('#filter-category').val();
        const sort = $('#sort-expenses').val();
        let filtered = expenses;
        if (filter !== 'All') {
            filtered = filtered.filter(e => e.category === filter);
        }
        filtered.sort((a, b) => {
            if (sort === 'date-desc') return new Date(b.date) - new Date(a.date);
            if (sort === 'date-asc') return new Date(a.date) - new Date(b.date);
            if (sort === 'amount-desc') return b.amount - a.amount;
            if (sort === 'amount-asc') return a.amount - b.amount;
        });
        list.empty();
        if (filtered.length === 0) return empty.show();
        empty.hide();
        filtered.forEach(exp => {
            const date = new Date(exp.date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric'
            });
            const badgeColor = getCategoryColor(exp.category);
            const notes = exp.notes ? `<small class="text-muted">${exp.notes}</small>` : '';
            const item = `
<div class="list-group-item expense-item p-3 mb-2 animate-add">
<div class="d-flex justify-content-between align-items-center">
<div>
<div class="d-flex align-items-center">
<h6 class="mb-0">${exp.name}</h6>

<span class="badge bg-${badgeColor} ms-2 category-
badge">${exp.category}</span>

</div>
<div class="date-text">${date}</div>
${notes}
</div>
<div class="d-flex align-items-center">
<span class="expense-amount me-3">$${exp.amount.toFixed(2)}</span>
<button class="btn-delete" data-id="${exp.id}">
<i class="bi bi-trash"></i>

</button>
</div>
</div>
</div>`;
            list.append(item);
        });
    }
    function updateSummary() {
        const total = expenses.reduce((sum, e) => sum + e.amount, 0);
        const now = new Date();
        const month = now.getMonth(), year = now.getFullYear();
        const monthTotal = expenses
            .filter(e => new Date(e.date).getMonth() === month && new Date(e.date).getFullYear()
                === year)
            .reduce((sum, e) => sum + e.amount, 0);
        const avg = now.getDate() ? monthTotal / now.getDate() : 0;
        $('#total-expenses').text(`$${total.toFixed(2)}`);
        $('#month-expenses').text(`$${monthTotal.toFixed(2)}`);
        $('#avg-expenses').text(`$${avg.toFixed(2)}`);
    }
    function getCategoryColor(category) {
        const colors = {
            'Food': 'success',
            'Transportation': 'info',
            'Entertainment': 'purple',
            'Shopping': 'warning',
            'Utilities': 'primary',
            'Housing': 'danger',
            'Healthcare': 'pink',
            'Education': 'indigo',
            'Personal': 'teal',
            'Other': 'secondary'
        };
        return colors[category] || 'secondary';
    }
    function showAlert(message, type) {
        const alert = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
${message}

<button type="button" class="btn-close" data-bs-dismiss="alert" aria-
label="Close"></button>

</div>`;
        $('#expenses-container').prepend(alert);

        setTimeout(() => $('.alert').alert('close'), 3000);
    }
});