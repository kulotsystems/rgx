<h2>Regular Expression to NFA Converter and Simulator</h2>
<small>
    <b>Supported Regex Operators:</b>
    <table>
        <thead>
            <tr>
                <td><small>Operator</small></td>
                <td><small>Description</small></td>
                <td><small>Example</small></td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td align="center"><b><code>&ast;</code></b></td>
                <td><small>The preceding item will be matched zero or more times.</small></td>
                <td align="center"><code>a&ast;b</code></td>
            </tr>
            <tr>
                <td align="center"><b><code>?</code></b></td>
                <td><small>The preceding item is optional and will be matched, at most, once.</small></td>
                <td align="center"><code>a?b</code></td>
            </tr>
            <tr>
                <td align="center"><b><code>+</code></b></td>
                <td><small>The preceding item will be matched one or more times.</small></td>
                <td align="center"><code>a+b</code></td>
            </tr>
            <tr>
                <td align="center"><b><code>|</code></b></td>
                <td><small>Either of the preceding or succeeding item will be matched.</small></td>
                <td align="center"><code>a|b</code></td>
            </tr>
        </tbody>
    </table>
    <b>Grouping regex is also supported using parenthesis.</b><br>
    Example: <code>((a?b)|c*)+d</code>
</small>
<hr>
<small>
    <b>How to run:</b> Just open <code>index.html</code> on your web browser or visit either of the following:
    <ul>
        <li><a href="https://kulotsystems.github.io/rgx" target="_blank">https://kulotsystems.github.io/rgx</a></li>
        <li><a href="https://rgx.netlify.app" target="_blank">https://rgx.netlify.app</a></li>
    </ul>
</small>
<br><br>
<small><i>(This project was created in year 2016)</i></small>
