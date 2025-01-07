let {assert, log, table, time, timeEnd} = console

let $ = id => document.getElementById(id)

let _ = (tag='div', conf, style) => {
  let el = document.createElement(tag)
  if (conf) Object.assign(el, conf)
  if (style) el.style.cssText = style
  return el
}

let liClick = e => alert(`clicked ${e.target.textContent}`)

let li = text => _('li', {
  className: 'sidebar-list',
  style: `
    padding: 4px 16px;
    cursor: pointer;
    font-size: 15px;
    color: #ccc;
    transition: background-color 0.2s;
    border-radius: 4px;
    display: flex;
    align-items: center;
  `,
  onclick: liClick,
  innerHTML: text.startsWith('#') ? text : `
    <div class="status-indicator ${text === 'John Doe' ? 'status-offline' : 'status-online'}" 
         style="width: 8px; height: 8px; border-radius: 50%; margin-right: 8px;"></div>
    ${text}
  `
})

let ul = (title, items, liFunc = li) => {
  let el = _('ul', {
    className: 'sidebar-section',
    id: `${title}-section`,
    style: `
      display: flex;
      flex-direction: column;
      padding: 12px 0;
      border-bottom: ${title === 'Channels' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'};
      list-style: none;
      margin: 0;
    `,
  })
  
  let header = _('div', {
    className: 'section-header',
    style: `
      color: #999;
      font-size: 12px;
      font-weight: 600;
      padding: 0 16px 8px;
      text-transform: uppercase;
    `,
    textContent: title
  })
  
  el.appendChild(header)
  items.forEach(item => {
    const listItem = liFunc(item)
    listItem.addEventListener('mouseover', () => {
      listItem.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
    })
    listItem.addEventListener('mouseout', () => {
      listItem.style.backgroundColor = ''
    })
    el.appendChild(listItem)
  })
  return el
}

let draw = () => {
  const sidebar = document.querySelector('.sidebar')
  sidebar.innerHTML = ''
  
  // Add workspace header
  const workspaceHeader = _('div', {
    className: 'workspace-header',
    style: `
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      height: 49px;
      margin-bottom: 16px;
      padding: 0 16px;
    `
  })
  
  const workspaceName = _('div', {
    className: 'workspace-name',
    style: `
      font-size: 18px;
      font-weight: bold;
      color: white;
    `,
    textContent: 'ChatGenius'
  })
  
  workspaceHeader.appendChild(workspaceName)
  sidebar.appendChild(workspaceHeader)
  
  // Add channels and DMs
  const channels = ['# general', '# random', '# announcements']
  const dms = ['Jane Smith', 'John Doe', 'Sarah Wilson']
  
  sidebar.appendChild(ul('Channels', channels))
  sidebar.appendChild(ul('Direct Messages', dms))
}

// Initialize the sidebar
draw()