import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const supabaseUrl = 'https://oyckrchotzjxbodewnje.supabase.co'
const supabaseKey = 'sb_publishable_mZcuptwroOU4CXgFuG73bg_PfZEChds'
const supabase = createClient(supabaseUrl, supabaseKey)

async function fetchArticles() {
  const container = document.getElementById('articles-container')
  const { data, error } = await supabase
    .from('article')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    container.innerHTML = `<div>${error.message}</div>`
    return
  }

  if (data.length === 0) {
    container.innerHTML = `<div>Brak danych</div>`
    return
  }

  container.innerHTML = data.map(article => {
    const date = new Date(article.created_at).toLocaleDateString('pl-PL')
    return `
      <article class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 class="text-2xl font-bold text-gray-900 mb-1">${article.title}</h2>
        <h3 class="text-lg text-gray-600 font-medium mb-3">${article.subtitle}</h3>
        <div class="text-xs text-gray-400 font-medium mb-4">
          <span>Autor: <strong class="text-gray-700">${article.author}</strong></span>
          <span>•</span>
          <span>${date}</span>
        </div>
        <p class="text-gray-700 leading-relaxed whitespace-pre-line">${article.content}</p>
      </article>
    `
  }).join('')
}

const form = document.getElementById('add-article-form')
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const author = document.getElementById('author-input').value
  const title = document.getElementById('title-input').value
  const subtitle = document.getElementById('subtitle-input').value
  const content = document.getElementById('content-input').value

  const { error } = await supabase
    .from('article')
    .insert([{ author, title, subtitle, content }])

  if (error) {
    alert(error.message)
  } else {
    form.reset()
    await fetchArticles()
  }
})

fetchArticles()
