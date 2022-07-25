export const menuContainerTemplate = (menu, category, categoryName) => {
    return `
        <menuContainer>
            <div class="heading">    
                <h2 class="menu-title">${categoryName} 메뉴 관리</h2>
                <span class="total-cnt">총 ${menu[category].length} 개</span>
            </div>
            <form class="form">
                <input class="input" type="text">
                <input class="btn addBtn" type="button" value="추가"/>
            </form>
            <ul class="menu-list">
                ${menu[category].map((item) => {
                    return `
                    <li data-menu-id=${item.id}>
                        <span class= "menu-name ${item.isSoldOut ? 'sold-out' : ''}">${item.name}</span>
                        <button class="btn completeBtn">품절</button>
                        <button class="btn updateBtn">수정</button>
                        <button class="btn deleteBtn">삭제</button>
                    </li>`
                }).join('')}
            </ul>
        </menuContainer>
    `;
}