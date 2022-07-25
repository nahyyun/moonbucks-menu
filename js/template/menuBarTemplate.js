export const menuBarTemplate = () => {
    return `
    <div class="header">
        <h1 class="title">☕스타벅스 메뉴 관리☕</h1>
        <ul class="nav-list">
            <li data-category-name="espresso" class="category-name">
            ☕ 에스프레소
            </li>
            <li data-category-name="frappuccino" class="category-name">
            🥤 프라푸치노
            </li>
            <li data-category-name="blended" class="category-name">
            🍹 블렌디드
            </li>
            <li data-category-name="teavana" class="category-name">
            🍸 티바나
            </li>
            <li data-category-name="desert" class="category-name">
            🍰 디저트
            </li>
        </ul>
    </div>
    `;
}



