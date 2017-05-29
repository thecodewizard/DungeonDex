<!doctype html>
<html lang="en">
<head>
    <!-- General Headers -->
    <title>Mage Scrolls</title>
    <?php require "./../pageparts/header.html" ?>
</head>
<body>
<header>
    <?php include "./../pageparts/navbar.html" ?>
</header>

<main>
    <div id="placeholder" class="container">
        <section id="race_slider" class="carousel slide carousel-fade" data-ride="carousel" data-interval="false">
            <!-- Indicators -->
            <ol id="cindic" class="carousel-indicators">
                <li data-target="#race_slider" data-slide-to="0" class="active"></li>
                <li data-target="#race_slider" data-slide-to="1"></li>
                <li data-target="#race_slider" data-slide-to="2"></li>
                <li data-target="#race_slider" data-slide-to="3"></li>
            </ol>

            <!-- Wrapper -->
            <div class="carousel-inner" role="listbox">
                <div class="item active">
                    <section class="character_base">
                        <article class="raceholder">
                            <img src="./../assets/Characters/orc.png" alt="Orc"/>
                        </article>
                        <article>
                            <?php $id=0; include "./../pageparts/class_carousel_content.php"; ?>
                            <div class="class_description">
                                <h2>Orc <span class="class_name">Druid</span></h2>
                                <section>
                                    <p>The Orc is one of the most vicious creatures that wander the realm.
                                        Each Peasant trembles before this fearsome creature. Killing is your second nature.</p>
                                    <p class="class_descr">Master of Potionmaking. One with nature. As a druid you help the world
                                        but the world helps you. When one of your enemies walk into a forrest,
                                        be damn sure they'll never come back.</p>
                                </section>
                                <section>
                                    <h3>Racial Characteristics</h3>
                                    <div>
                                        <div class="weapon logo"><span class="icon"></span></div>
                                        <div class="monster logo"><span class="icon"></span></div>
                                        <div class="monster logo"><span class="icon"></span></div>
                                    </div>
                                    <h3>Class Characteristics</h3>
                                    <div class="class_chars">
                                        <div class="weapon logo"><span class="icon"></span></div>
                                        <div class="monster logo"><span class="icon"></span></div>
                                        <div class="monster logo"><span class="icon"></span></div>
                                    </div>
                                </section>
                                <div class="btn btn-warning btn-outline" data-function="create">Create An Orc <span class="class_name">Druid</span> </div>
                            </div>
                        </article>
                    </section>
                </div>
                <div class="item">
                    <section class="character_base">
                        <article class="raceholder">
                            <img src="./../assets/Characters/human.png" alt="Human"/>
                        </article>
                        <article>
                            <?php $id=1; include "./../pageparts/class_carousel_content.php"; ?>
                            <div class="class_description">
                                <h2>Human <span class="class_name">Druid</span></h2>
                                <section>
                                    <p>You are the most common race in the realm, so you're naturally bonded with the people.
                                    Humans do have a ruthless reputation in battlefield, but most of them are also viable for the more
                                    subtle ways of life, and can wield the power of magic.</p>
                                    <p class="class_descr">Master of Potionmaking. One with nature. As a druid you help the world
                                        but the world helps you. When one of your enemies walk into a forrest,
                                        be damn sure they'll never come back.</p>
                                </section>
                                <section>
                                    <h3>Racial Characteristics</h3>
                                    <div>
                                        <div class="spell logo"><span class="icon"></span></div>
                                        <div class="monster logo"><span class="icon"></span></div>
                                    </div>
                                    <h3>Class Characteristics</h3>
                                    <div class="class_chars">
                                        <div class="weapon logo"><span class="icon"></span></div>
                                        <div class="monster logo"><span class="icon"></span></div>
                                        <div class="monster logo"><span class="icon"></span></div>
                                    </div>
                                </section>
                                <div class="btn btn-warning btn-outline" data-function="create">Create A Human <span class="class_name">Druid</span> </div>
                            </div>
                        </article>
                    </section>
                </div>
                <div class="item">
                    <section class="character_base">
                        <article class="raceholder">
                            <img src="./../assets/Characters/Dwarf.png" alt="Dwarf"/>
                        </article>
                        <article>
                            <?php $id=2; include "./../pageparts/class_carousel_content.php"; ?>
                            <div class="class_description">
                                <h2>Dwarven <span class="class_name">Druid</span></h2>
                                <section>
                                    <p>A Dwarf is one of the most sturdy races in the realm. It tackles huge enemies and leaves
                                    a trail of blood and despair. Don't you dare mock their size.</p>
                                    <p class="class_descr">Master of Potionmaking. One with nature. As a druid you help the world
                                        but the world helps you. When one of your enemies walk into a forrest,
                                        be damn sure they'll never come back.</p>
                                </section>
                                <section>
                                    <h3>Racial Characteristics</h3>
                                    <div>
                                        <div class="weapon logo"><span class="icon"></span></div>
                                        <div class="monster logo"><span class="icon"></span></div>
                                        <div class="monster logo"><span class="icon"></span></div>
                                        <div class="monster logo"><span class="icon"></span></div>
                                    </div>
                                    <h3>Class Characteristics</h3>
                                    <div class="class_chars">
                                        <div class="weapon logo"><span class="icon"></span></div>
                                        <div class="monster logo"><span class="icon"></span></div>
                                        <div class="monster logo"><span class="icon"></span></div>
                                    </div>
                                </section>
                                <div class="btn btn-warning btn-outline" data-function="create">Create A Dwarven <span class="class_name">Druid</span> </div>
                            </div>
                        </article>
                    </section>
                </div>
                <div class="item">
                    <section class="character_base">
                        <article class="raceholder">
                            <img src="./../assets/Characters/Elf.png" alt="Elf"/>
                        </article>
                        <article>
                            <?php $id=3; include "./../pageparts/class_carousel_content.php"; ?>
                            <div class="class_description">
                                <h2>Elven <span class="class_name">Druid</span></h2>
                                <section>
                                    <p>An elf is the symbol of elegance and magic is sprouting in all of their kin.
                                    Their speed and skills are unequalled in battle.</p>
                                    <p class="class_descr">Master of Potionmaking. One with nature. As a druid you help the world
                                        but the world helps you. When one of your enemies walk into a forrest,
                                        be damn sure they'll never come back.</p>
                                </section>
                                <section>
                                    <h3>Racial Characteristics</h3>
                                    <div>
                                        <div class="spell logo"><span class="icon"></span></div>
                                        <div class="monster logo"><span class="icon"></span></div>
                                        <div class="monster logo"><span class="icon"></span></div>
                                    </div>
                                    <h3>Class Characteristics</h3>
                                    <div class="class_chars">
                                        <div class="weapon logo"><span class="icon"></span></div>
                                        <div class="monster logo"><span class="icon"></span></div>
                                        <div class="monster logo"><span class="icon"></span></div>
                                    </div>
                                </section>
                                <div class="btn btn-warning btn-outline" data-function="create">Create An Elven <span class="class_name">Druid</span> </div>
                            </div>
                        </article>
                    </section>
                </div>
            </div>

            <!-- Controls -->
            <a class="left carousel-control" href="#race_slider" data-slide="prev" id="ctrll">
                <span class="glyphicon glyphicon-chevron-left"></span>
            </a>
            <a class="right carousel-control" href="#race_slider" data-slide="next" id="ctrlr">
                <span class="glyphicon glyphicon-chevron-right"></span>
            </a>
        </section>
        <section id="monster_load" style="display: none; height: 700px;">
            <?php include "./../pageparts/loadicon.html"; ?>
        </section>
        <section style="display:none;">
            <div class="character_base">
                <article class="raceholder">
                    <img src="<?php require "./../pageparts/random_monster_imgsrc.php"; ?>" alt="monster" />
                </article>
                <article>
                    <div id="monster_description" class="class_description">
                        <h2>Your Monster</h2>
                        <div>
                            <h3 id="monster_name">Dragon Turtle</h3>
                            <p>His Type: <span id="monster_type">Dragon</span></p>
                            <p>His Size: <span id="monster_size">Huge</span></p>
                            <p>His Challenge Level: <span id="monster_challenge">12.78</span></p>
                        </div>
                        <div class="row">
                            <h3>Equip Your Weapons</h3>
                            <section class="formholder" class="row">
                                <div style="display:inline-block">
                                    <form class="form-inline" style="display: none;" id="left_weapon_container">
                                        <div class="form-group">
                                            <label class="sr-only" for="left_weapon_name"></label>
                                            <div class="input-group">
                                                <input required type="text" class="form-control" id="left_weapon_name" placeholder="Name Of Weapon">
                                                <label class="input-group-addon" role="button" id="left_weapon_label">
                                                    <span class="glyphicon glyphicon-screenshot"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </form>
                                    <form class="form-inline" style="display: none;" id="left_spell_container">
                                        <div class="form-group">
                                            <label class="sr-only" for="left_spell_name"></label>
                                            <div class="input-group">
                                                <input required type="text" class="form-control" id="left_spell_name" placeholder="Name Of Spell">
                                                <label class="input-group-addon" role="button" id="left_spell_label">
                                                    <span class="glyphicon glyphicon-fire"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div style="display:inline-block">
                                    <form class="form-inline" style="display: none;" id="right_weapon_container">
                                        <div class="form-group">
                                            <label class="sr-only" for="right_weapon_name"></label>
                                            <div class="input-group">
                                                <input required type="text" class="form-control" id="right_weapon_name" placeholder="Name Of Weapon">
                                                <label class="input-group-addon" role="button" id="right_weapon_label">
                                                    <span class="glyphicon glyphicon-screenshot"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </form>
                                    <form class="form-inline" style="display: none;" id="right_spell_container">
                                        <div class="form-group">
                                            <label class="sr-only" for="right_spell_name"></label>
                                            <div class="input-group">
                                                <input required type="text" class="form-control" id="right_spell_name" placeholder="Name Of Spell">
                                                <label class="input-group-addon" role="button" id="right_spell_label">
                                                    <span class="glyphicon glyphicon-fire"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </section>
                        </div>
                        <div>
                            <h3>How you'll fight</h3>
                            <label for="strategy_descr" id="lbl_strategy">
                                <textarea id="strategy_descr"></textarea>
                            </label>
                        </div>
                        <div id="confirm_fight" class="btn btn-warning btn-outline btn-lg disabled">Confirm Fight</div>
                    </div>
                </article>
            </div>
        </section>
    </div>
    <div class="ui-helper-hidden">
        <form id="fight_form" method="post" action="./../server/characters/set_battle.php">
            <input type="hidden" id="race" name="race"/>
            <input type="hidden" id="class" name="class" />
            <input type="hidden" id="monster" name="monster" />
            <input type="hidden" id="left_weapon" name="left_weapon" />
            <input type="hidden" id="left_spell" name="left_spell" />
            <input type="hidden" id="right_weapon" name="right_weapon" />
            <input type="hidden" id="right_spell" name="right_spell" />
            <input type="hidden" id="strategy" name="strategy" />
        </form>
    </div>
</main>

<footer class="footer">
    <?php include "./../pageparts/footer.html" ?>
</footer>
<?php include "./../pageparts/scripts.html" ?>
    <script>
        window.addEventListener('DOMContentLoaded', function(){
            hero.init();
        });
    </script>
</body>
</html>